const fs = require('fs');
const path = require('path');

// JSON 파일 읽기
const filePath = path.join(__dirname, 'src', 'localization-case_15-21.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 키들을 그룹화 (prefix별로)
const keyGroups = {};
const keys = Object.keys(data);

keys.forEach(key => {
  // 숫자로 끝나는 키 찾기
  const match = key.match(/^(.+?)(\d+)$/);
  if (match) {
    const prefix = match[1];
    const number = parseInt(match[2], 10);
    
    if (!keyGroups[prefix]) {
      keyGroups[prefix] = [];
    }
    keyGroups[prefix].push({ originalKey: key, number });
  }
});

// 새로운 데이터 객체 생성
const newData = {};
const processedKeys = new Set();

// 모든 키를 순회하면서 처리
keys.forEach(key => {
  // 이미 처리된 키는 건너뛰기
  if (processedKeys.has(key)) {
    return;
  }
  
  const match = key.match(/^(.+?)(\d+)$/);
  if (match) {
    const prefix = match[1];
    const group = keyGroups[prefix];
    
    if (group && group.length > 1) {
      // 그룹 내에서 숫자로 정렬
      group.sort((a, b) => a.number - b.number);
      
      // 최소값 확인
      const minNumber = group[0].number;
      
      if (minNumber > 0) {
        // 1부터 시작하는 경우 0부터 시작하도록 재정렬
        group.forEach((item, index) => {
          const newKey = `${prefix}${index}`;
          newData[newKey] = data[item.originalKey];
          processedKeys.add(item.originalKey);
        });
      } else {
        // 이미 0부터 시작하는 경우 그대로 유지
        group.forEach(item => {
          newData[item.originalKey] = data[item.originalKey];
          processedKeys.add(item.originalKey);
        });
      }
    } else if (group && group.length === 1) {
      // 숫자가 하나뿐인 경우 그대로 유지 (사용자 요청에 따라)
      newData[group[0].originalKey] = data[group[0].originalKey];
      processedKeys.add(group[0].originalKey);
    } else {
      // 숫자로 끝나지만 그룹에 없는 경우 (이상한 경우)
      newData[key] = data[key];
      processedKeys.add(key);
    }
  } else {
    // 숫자로 끝나지 않는 키는 그대로 유지
    newData[key] = data[key];
    processedKeys.add(key);
  }
});

// JSON 파일에 쓰기 (들여쓰기 2칸으로 포맷팅)
fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');

console.log('완료: 키 번호가 0부터 시작하도록 수정되었습니다.');

