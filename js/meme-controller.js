'use strict';
var gCanvas;
var gCtx;
var gText;

function renderImgs() {
    const imgs = getImgs()
    const strHtml = imgs.map(img => {
        return `<img onclick="onImgClick(${img.id})" class="preview" src="${img.url}">`
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('');
}

function renderKeyWords() {
    var keywords = getKeyWords()
    var funny = document.querySelector('.funny');
    var angry = document.querySelector('.angry');
    var cute = document.querySelector('.cute');
    var animal = document.querySelector('.animal');
    funny.style.fontSize = keywords.funny + 'px';
    angry.style.fontSize = keywords.angry + 'px';
    cute.style.fontSize = keywords.cute + 'px';
    animal.style.fontSize = keywords.animal + 'px';
}


function renderCanvas() {
    const meme = getMeme();
    const img = getImgById(meme.selectedImgId)
    drawImg(img);
    drawText(meme);
}

function renderSavedMemes() {
    let memes = loadFromStorage(KEYARR);
}

function oninit() {
    gCanvas = document.getElementById('img-canvas');
    gCtx = gCanvas.getContext('2d');
    renderImgs()
    renderKeyWords()
}

function onFilterImgs(txt) {
    filterImgs(txt);
    renderImgs()
    renderKeyWords()
}

function onImgClick(id) {
    const elSavedMemes = document.querySelector('.saved-memes')
    const elEditor = document.querySelector('.img-editor');
    const elMain = document.querySelector('.main');
    elMain.hidden = true;
    elEditor.hidden = false;
    elSavedMemes.hidden = true;
    let img = getImgById(id);
    updateMeme(id);
    drawImg(img);
}

function onGallery() {
    const elSavedMemes = document.querySelector('.saved-memes')
    const elEditor = document.querySelector('.img-editor');
    const elMain = document.querySelector('.main');
    elMain.hidden = false;
    elEditor.hidden = true;
    elSavedMemes.hidden = true;
}

function onUpdateText(txt) {
    updateText(txt);
    renderCanvas();
}

function onSizeChange(classList) {
    updateTextSize(classList);
    renderCanvas();
}

function onChangePos(classList) {
    updateTextPos(classList);
    renderCanvas();
}

function onSwitchLine() {
    updateLineIdx();
    renderCanvas();
}

function onAddLine() {
    addLine();
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
    renderCanvas();
}

function onAlignChange(classList) {
    alignChange(classList);
    renderCanvas();
}

function onSetFont(font) {
    setFont(font);
    renderCanvas();
}

function onSetColor(color) {
    setColor(color);
    renderCanvas();
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function onMemes() {
    const elEditor = document.querySelector('.img-editor');
    const elMain = document.querySelector('.main');
    let elSavedMemes = document.querySelector('.saved-memes');

    console.log('elSavesMemes', elSavedMemes);
    elMain.hidden = true;
    elEditor.hidden = true;
    elSavedMemes.hidden = false;
}

function onSave() {
    saveMeme()
}

function onFilterByKeyWord(elkeyword) {
    filterByKeyWord(elkeyword.innerHTML);
    renderImgs();
    renderKeyWords();
}