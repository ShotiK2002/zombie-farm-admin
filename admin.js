
let tool = 'tree';
const map = document.getElementById('map');
const grid = [];

function setTool(type) {
  tool = type;
}

function createCell(x, y) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.dataset.x = x;
  cell.dataset.y = y;
  cell.onclick = () => {
    if (cell.classList.contains('object')) {
      cell.classList.remove('object');
      cell.dataset.type = '';
    } else {
      cell.classList.add('object');
      cell.dataset.type = tool;
    }
  };
  return cell;
}

for (let y = 0; y < 40; y++) {
  for (let x = 0; x < 40; x++) {
    const cell = createCell(x, y);
    map.appendChild(cell);
    grid.push(cell);
  }
}

function saveMap() {
  const data = grid.map(cell => ({
    x: cell.dataset.x,
    y: cell.dataset.y,
    type: cell.dataset.type || null
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'island.json';
  a.click();
}
