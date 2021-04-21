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
    if (!memes) {
        document.querySelector('.saved-memes').innerHTML = '<h1>No Memes For Display</h1>'
    } else {
        const strHtml = memes.map(meme => {
            return `<img onclick="onMemeClick(${meme.id})" class="preview" src="${meme.url}"></img>`
        })
        console.log(memes);

        document.querySelector('.saved-memes').innerHTML = strHtml.join('')
    }
}

function oninit() {
    gCanvas = document.getElementById('img-canvas');
    gCtx = gCanvas.getContext('2d');
    renderSavedMemes();
    renderImgs();
    renderKeyWords();
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
    elSavedMemes.style.display = 'none';
    let img = getImgById(id);
    console.log('img', img);

    updateMeme(id);
    drawImg(img);
}

function onMemeClick(memeId) {
    const elSavedMemes = document.querySelector('.saved-memes');
    const elEditor = document.querySelector('.img-editor');
    elEditor.hidden = false;
    elSavedMemes.style.display = 'none';
    let meme = getMemeById(memeId)
    let img = getImgById(meme.properties.selectedImgId)
    updateMeme(meme.properties.selectedImgId);
    drawSavedImg(img, meme)

}

function onGallery() {
    const elSavedMemes = document.querySelector('.saved-memes')
    const elEditor = document.querySelector('.img-editor');
    const elMain = document.querySelector('.main');
    elMain.hidden = false;
    elEditor.hidden = true;
    elSavedMemes.style.display = 'none';
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
    var imgContent = gCanvas.toDataURL('imgs')
    console.log('imgContent', imgContent);

    elLink.href = imgContent;
    // const data = gCanvas.toDataURL();
    // elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function onMemes() {
    const elEditor = document.querySelector('.img-editor');
    const elMain = document.querySelector('.main');
    let elSavedMemes = document.querySelector('.saved-memes');
    elMain.hidden = true;
    elEditor.hidden = true;
    elSavedMemes.style.display = 'block';
    renderSavedMemes()
}

function onSave() {
    saveMeme()
}

function onFilterByKeyWord(elkeyword) {
    filterByKeyWord(elkeyword.innerHTML);
    renderImgs();
    renderKeyWords();
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}