const utterance = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropDown  = document.querySelector('[name="voices"]');
const textArea = document.querySelector('textarea');
const btnS = document.querySelectorAll('.btns button');
const options = document.querySelectorAll('[name="text"],[type="range"]');
console.log(options);
utterance.text = textArea.value;
const getVoices = function(e){
    voices = speechSynthesis.getVoices();
    voiceDropDown.innerHTML = voices.map(voice=> `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join("");
};
const toggle = function(startOver=true){
    speechSynthesis.cancel();
    if (startOver){
        speechSynthesis.speak(utterance);
    }
};
const chooseVoice = function(){
    utterance.voice = voices.find(voice => voice.name === this.value);
    console.log(utterance);
    toggle(true);
};
const setOptions = function(e){
    console.log(this.name,this.value);
    utterance[this.name] = this.value;
    toggle(true);
};
speechSynthesis.addEventListener('voiceschanged',getVoices);
voiceDropDown.addEventListener('change',chooseVoice);
btnS.forEach(btn =>btn.addEventListener('click',(e)=>{
    toggle(e.target.value === 'speak'?true:false);
}));
options.forEach(option => option.addEventListener('change',setOptions))