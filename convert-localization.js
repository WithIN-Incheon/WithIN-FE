// localization.json 포맷 변환 스크립트
const fs = require('fs');
const path = require('path');

// 원본 파일 읽기
const inputPath = path.join(__dirname, 'src', 'localization.json');
const outputPath = path.join(__dirname, 'src', 'localization-new.json');

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// 새로운 구조로 변환
const newStructure = {};

data.Sheet1.forEach(item => {
  const varName = item.var;
  
  // var 이름을 카테고리와 키로 분리
  // 예: "firstLang" -> category: "first", key: "lang"
  // "applyEnterName" -> category: "apply", key: "enterName"
  
  let category = '';
  let key = '';
  
  // 카테고리 추출 (소문자 시작 부분)
  const match = varName.match(/^([a-z]+)(.+)$/);
  
  if (match) {
    category = match[1];
    key = match[2];
    // 첫 글자를 소문자로
    key = key.charAt(0).toLowerCase() + key.slice(1);
  } else {
    // 매칭 안되면 전체를 키로 사용
    category = 'misc';
    key = varName;
  }
  
  // 카테고리가 없으면 생성
  if (!newStructure[category]) {
    newStructure[category] = {};
  }
  
  // 키가 없으면 생성
  if (!newStructure[category][key]) {
    newStructure[category][key] = {};
  }
  
  // 각 언어별 번역 추가
  const languages = ['KO', 'MM', 'VN', 'ID', 'EN', 'NP', 'TH', 'RU'];
  languages.forEach(lang => {
    if (item[lang]) {
      newStructure[category][key][lang] = item[lang];
    }
  });
});

// 정렬된 JSON으로 저장
const sortedStructure = {};
Object.keys(newStructure).sort().forEach(key => {
  sortedStructure[key] = newStructure[key];
});

fs.writeFileSync(
  outputPath,
  JSON.stringify(sortedStructure, null, 2),
  'utf8'
);

console.log('✅ 변환 완료!');
console.log(`📄 입력: ${inputPath}`);
console.log(`📄 출력: ${outputPath}`);
console.log(`📊 카테고리 수: ${Object.keys(sortedStructure).length}`);

