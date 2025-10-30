// core_utils.ts (브라우저용)
import { PDFDocument, rgb, PDFPage, PDFFont, type RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

// 필드 설정 인터페이스
interface FieldConfig {
  describe?: string;
  p: number; // 페이지 인덱스
  x: number; // X 좌표
  y: number; // Y 좌표
  size?: number; // 폰트 크기
  boxType?: 'dash' | 'date' | 'radio';
  radioOptions?: Array<{ x: number; y: number }>;
  letterSpacing?: number;
  mask?: boolean;
}

interface FieldsJson {
  [key: string]: FieldConfig;
}

interface FillPdfParams {
  data?: Record<string, any>;
  fieldsOverride?: FieldsJson | null;
  templatePath?: string;
  fontPath?: string;
  fieldsJsonData?: FieldsJson | null;
}

interface FillBoxesParams {
  data: any;
  type: 'dash' | 'date' | 'radio';
  startX: number;
  startY: number;
  size?: number;
  page: PDFPage;
  font: PDFFont;
  color?: RGB;
  radioOptions?: Array<{ x: number; y: number }>;
}

/**
 * PDF 채우기 코어 함수 (브라우저용)
 */
export async function fillPdf({
  data = {},
  fieldsOverride = null,
  templatePath = "/template3.pdf",
  fontPath = "/fonts/NotoSansKR-Regular.ttf",
  fieldsJsonData = null,
}: FillPdfParams = {}): Promise<Uint8Array> {
  // 1) 템플릿 & 폰트 & 필드 설정 로드
  const [templateResponse, fontResponse, fieldsResponse] = await Promise.all([
    fetch(templatePath),
    fetch(fontPath),
    fieldsJsonData ? Promise.resolve(fieldsJsonData) : fetch("/fields.json").then(r => r.json()),
  ]);

  const templateBytes = await templateResponse.arrayBuffer();
  const fontBytes = await fontResponse.arrayBuffer();
  
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  // 폰트 서브셋 비활성화
  const font = await pdfDoc.embedFont(fontBytes, { subset: false });

  // 2) 좌표 맵
  const fieldsJson: FieldsJson = fieldsOverride ?? (fieldsResponse as FieldsJson);

  // 3) 각 필드 쓰기
  for (const [key, cfg] of Object.entries(fieldsJson)) {
    const valRaw = data[key];
    if (valRaw == null) continue;

    const pageIndex = cfg.p ?? 0;
    const page = pdfDoc.getPages()[pageIndex];
    if (!page) continue;

    const size = cfg.size ?? 12;
    const color = rgb(0, 0, 0);

    // 박스 타입이 지정된 경우 fillBoxes 사용
    if (cfg.boxType) {
      fillBoxes({
        data: valRaw,
        type: cfg.boxType,
        startX: cfg.x,
        startY: cfg.y,
        size,
        page,
        font,
        color,
        radioOptions: cfg.radioOptions || [],
      });
    } else if (cfg.letterSpacing && cfg.letterSpacing > 0) {
      // 기존 letterSpacing 로직
      let x = cfg.x;
      const y = cfg.y;
      const text = String(valRaw);
      for (const ch of text) {
        page.drawText(ch, { x, y, size, font, color });
        x += cfg.letterSpacing;
      }
    } else {
      // 기존 일반 텍스트 로직
      const text = String(valRaw);
      page.drawText(text, { x: cfg.x, y: cfg.y, size, font, color });
    }
  }

  // 4) 결과 반환
  const out = await pdfDoc.save();
  return out;
}

/**
 * 박스 형태로 글자를 그리는 함수
 */
export function fillBoxes({
  data,
  type,
  startX,
  startY,
  size = 12,
  page,
  font,
  color = rgb(0, 0, 0),
  radioOptions = [],
}: FillBoxesParams): void {
  if (data == null || !type || !page || !font) {
    throw new Error('필수 파라미터가 누락되었습니다.');
  }

  let currentX = startX;
  const y = startY;

  if (type === 'dash') {
    // Box Dash: 입력 데이터의 대시 위치를 기준으로 처리
    const inputStr = String(data);
    
    // 거리 설정
    const boxSpacing = 17; // 박스 간 거리
    const dashSpacing = 4; // 대시를 지난 후 거리
    
    // 문자열을 한 글자씩 처리
    for (let i = 0; i < inputStr.length; i++) {
      const char = inputStr[i];
      
      if (char === '-') {
        // 대시면 출력하지 않고 간격만 추가
        currentX += dashSpacing;
      } else {
        // 숫자면 출력하고 박스 간격 추가
        page.drawText(char, { x: currentX, y, size, font, color });
        currentX += boxSpacing;
      }
    }
    
  } else if (type === 'date') {
    // Box Date: 년/월/일/시/분 형태
    const dateStr = String(data);
    const digits = dateStr.replace(/[^0-9]/g, '').split('');
    
    // 거리 설정
    const boxSpacing = 17; // 박스 간 거리
    const separatorSpacing = 6; // 년/월/일/시/분 구분 후 거리
    
    let digitIndex = 0;
    
    // 년도 (4자리)
    for (let i = 0; i < 4 && digitIndex < digits.length; i++) {
      page.drawText(digits[digitIndex], { x: currentX, y, size, font, color });
      currentX += boxSpacing;
      digitIndex++;
    }
    
    // 월 (2자리)
    if (digitIndex < digits.length) {
      currentX += separatorSpacing;
      for (let i = 0; i < 2 && digitIndex < digits.length; i++) {
        page.drawText(digits[digitIndex], { x: currentX, y, size, font, color });
        currentX += boxSpacing;
        digitIndex++;
      }
    }
    
    // 일 (2자리)
    if (digitIndex < digits.length) {
      currentX += separatorSpacing;
      for (let i = 0; i < 2 && digitIndex < digits.length; i++) {
        page.drawText(digits[digitIndex], { x: currentX, y, size, font, color });
        currentX += boxSpacing;
        digitIndex++;
      }
    }
    
    // 시 (2자리)
    if (digitIndex < digits.length) {
      currentX += separatorSpacing;
      for (let i = 0; i < 2 && digitIndex < digits.length; i++) {
        page.drawText(digits[digitIndex], { x: currentX, y, size, font, color });
        currentX += boxSpacing;
        digitIndex++;
      }
    }
    
    // 분 (2자리)
    if (digitIndex < digits.length) {
      currentX += separatorSpacing;
      for (let i = 0; i < 2 && digitIndex < digits.length; i++) {
        page.drawText(digits[digitIndex], { x: currentX, y, size, font, color });
        currentX += boxSpacing;
        digitIndex++;
      }
    }
    
  } else if (type === 'radio') {
    // Radio: 여러 옵션 중 하나만 선택
    const selectedIndex = parseInt(data);
    
    // 선택이 없거나 잘못된 값이면 체크를 그리지 않고 건너뛴다
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= radioOptions.length) {
      return;
    }
    
    // 선택된 옵션에만 체크 표시 (✓ 마크)
    const selectedOption = radioOptions[selectedIndex];
    const checkMark = '✓';
    
    page.drawText(checkMark, { 
      x: selectedOption.x, 
      y: selectedOption.y, 
      size, 
      font, 
      color 
    });
    
  } else {
    throw new Error('지원하지 않는 타입입니다. "dash", "date", 또는 "radio"를 사용하세요.');
  }
}