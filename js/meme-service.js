'use strict';
var gKeyewords = { happy: 12, funny: 15, angry: 12, sad: 2, cute: 15, animal: 20 };
const KEY = 'canvas';
const KEYARR = 'arrCanvas';
var gMemes = [];
var gProperties = []
var gFilterBy = '';

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['angry'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['happy', 'cute', 'animal'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['happy', 'cute', 'animal'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['cute', 'animal'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['angry', 'cute'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['cute'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'happy'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['funny'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'happy'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['angry'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['cute', 'funny'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Write Some',
        size: 40,
        align: 'center',
        strokeColor: 'black',
        color: 'white',
        pos: { x: 260, y: 35 },
        font: 'IMPACT',
        isDragging: false
    }, {
        txt: 'shit',
        size: 40,
        align: 'center',
        strokeColor: 'black',
        color: 'white',
        pos: { x: 260, y: 530 },
        font: 'IMPACT',
        isDragging: false
    }]
}

function addLine() {
    const line = {
        txt: 'New Line',
        size: 40,
        align: 'center',
        strokeColor: 'black',
        color: 'white',
        pos: { x: 260, y: 280 },
        font: 'IMPACT',
        isDragging: false
    }

    if (!gMeme.lines.length) line.pos.y = 35;
    if (gMeme.lines.length === 1) {
        if (gMeme.lines[0].pos.y === 530) line.pos.y = 35;
        else line.pos.y = 530;
    }
    gMeme.selectedLineIdx = gMeme.lines.length;
    gMeme.lines.push(line);
}

function filterImgs(txt) {
    if (txt === 'funny') {
        if (gKeyewords.funny > 30) return;
        gKeyewords.funny++;
    } else if (txt === 'angry') {
        if (txt > 30) return;
        gKeyewords.angry++;
    } else if (txt === 'cute') {
        if (gKeyewords.cute > 30) return;
        gKeyewords.cute++;
    } else if (txt === 'animal') {
        if (gKeyewords.animal > 30) return;
        gKeyewords.animal++;
    }
    gFilterBy = txt;
}

function removeLine() {
    if (!gMeme.lines.length) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}

function getImgs() {
    if (!gFilterBy) return gImgs
    var imgs = gImgs.filter(img => {
        return img.keywords.includes(gFilterBy)
    })

    return imgs;
}

function getKeyWords() {
    return gKeyewords;
}

function getImgById(imgId) {
    var img = gImgs.find(img => {
        return imgId === img.id;
    })
    return img;
}

function getMemeById(memeId) {
    let memes = loadFromStorage(KEYARR);

    var meme = memes.find(meme => {

        return memeId === meme.id;
    })
    return meme;
}

function deleteMeme(memeId) {
    let memes = loadFromStorage(KEYARR);
    var memeIdx = memes.findIndex(meme => {
        return memeId === meme.id;
    })
    memes.splice(memeIdx, 1);
    saveToStorage(KEYARR, memes);
}

function drawImg(img) {
    const newImg = new Image();
    newImg.src = img.url;



    newImg.onload = () => {
        gCtx.drawImage(newImg, 0, 0, gCanvas.width, gCanvas.height);
        drawText(gMeme)
    }
}

function drawSavedImg(img, meme) {
    const newImg = new Image();
    newImg.src = img.url;

    newImg.onload = () => {
        gCtx.drawImage(newImg, 0, 0, gCanvas.width, gCanvas.height);
        drawText(meme.properties)
    }
}

function drawText(meme) {
    const lines = meme.lines;
    let idx = 0;
    lines.map(line => {
        gCtx.lineWidth = 2;
        if (idx === gMeme.selectedLineIdx) {
            gCtx.strokeStyle = 'blue';
        } else {
            gCtx.strokeStyle = meme.lines[idx].strokeColor;
        }
        gCtx.fillStyle = meme.lines[idx].color;
        gCtx.font = `${meme.lines[idx].size}px ${meme.lines[idx].font}`;
        gCtx.textAlign = meme.lines[idx].align;
        gCtx.fillText(meme.lines[idx].txt, meme.lines[idx].pos.x, meme.lines[idx].pos.y)
        gCtx.strokeText(meme.lines[idx].txt, meme.lines[idx].pos.x, meme.lines[idx].pos.y)
        idx++;
    })
}

function drawTextBeforeSave(meme) {
    const lines = meme.lines;
    let idx = 0;
    lines.map(line => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = meme.lines[idx].strokeColor;
        gCtx.fillStyle = meme.lines[idx].color;
        gCtx.font = `${meme.lines[idx].size}px ${meme.lines[idx].font}`;
        gCtx.textAlign = meme.lines[idx].align;
        gCtx.fillText(meme.lines[idx].txt, meme.lines[idx].pos.x, meme.lines[idx].pos.y)
        gCtx.strokeText(meme.lines[idx].txt, meme.lines[idx].pos.x, meme.lines[idx].pos.y)
        idx++;
    })
}

function updateMeme(id) {
    gMeme.selectedImgId = id;
}

function updateSavedMeme(meme) {
    gMeme.selectedImgId = meme.properties.selectedImgId;
    gMeme.selectedLineIdx = meme.properties.selectedLineIdx;
    gMeme.lines = meme.properties.lines;
}

function getMeme() {
    return gMeme;
}

function updateText(txt) {
    if (!gMeme.lines.length) return
        // if (txt === '') removeLine();
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function updateTextSize(classList) {
    if (!gMeme.lines.length) return
    if (classList[0] === 'sizeUp') gMeme.lines[gMeme.selectedLineIdx].size += 5;
    else gMeme.lines[gMeme.selectedLineIdx].size -= 5;
}

function updateTextPos(classList) {
    if (!gMeme.lines.length) return
    if (classList[0] === 'posUp') gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10;
    else gMeme.lines[gMeme.selectedLineIdx].pos.y += 10;
}

function updateLineIdx() {
    if (!gMeme.lines.length) return
    const max = gMeme.lines.length;
    if (gMeme.selectedLineIdx < max - 1) gMeme.selectedLineIdx += 1;
    else {
        gMeme.selectedLineIdx = 0;
    }

}

function alignChange(classList) {
    if (!gMeme.lines.length) return
    if (classList[0] === 'alignLeft') gMeme.lines[gMeme.selectedLineIdx].align = 'left';
    else if (classList[0] === 'alignRight') gMeme.lines[gMeme.selectedLineIdx].align = 'right';
    else gMeme.lines[gMeme.selectedLineIdx].align = 'center';
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function saveMeme() {

    var value = loadFromStorage(KEYARR)
    if (!value) gMemes = [];
    else gMemes = loadFromStorage(KEYARR)
    var currCanvas = { url: gCanvas.toDataURL(`image/jpeg`), id: makeId(), properties: gMeme }
    gMemes.push(currCanvas);
    saveToStorage(KEYARR, gMemes)
}

function filterByKeyWord(keyword) {
    if (keyword === 'funny') {
        if (gKeyewords.funny > 30) return;
        gKeyewords.funny++;
    } else if (keyword === 'angry') {
        if (gKeyewords.angry > 30) return;
        gKeyewords.angry++;
    } else if (keyword === 'cute') {
        if (gKeyewords.cute > 30) return;
        gKeyewords.cute++;
    } else if (keyword === 'animal') {
        if (gKeyewords.animal > 30) return;
        gKeyewords.animal++;
    }
    gFilterBy = keyword;
}

function isDragging() {
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true;
}