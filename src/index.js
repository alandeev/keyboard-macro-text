const ioHook = require('iohook');
var ks = require('node-key-sender');

const keyboards = require('../keyboards.json');
const { print_key_when_press } = require('../config.json');

function findKeyMacroWithKeyPress({ shiftKey, altKey, ctrlKey, rawcode }){
  return keyboards.find(
  (config) => 
    ((config.shiftKey === shiftKey) && 
    (config.altKey === altKey) && 
    (config.ctrlKey === ctrlKey) && 
    (config.rawcode === rawcode))
  );
}


ks.setKeyboardLayout('slash');

ioHook.on('keypress', async (keyPress) => {
  const findedKey = findKeyMacroWithKeyPress(keyPress);

  if(findedKey){
    ks.sendKey(findedKey.sendCode);
    keyPress.finded_macro = findedKey ;
  }

  print_key_when_press ? console.log({ keyPress }) : null;
})

ioHook.start(); // starting

// Teste your typing here 😁
//
//
//
//