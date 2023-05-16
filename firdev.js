const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const CaseParam = {
  LOWERCASE: "lowercase",
  UPPERCASE: "uppercase",
  MIXEDCASE: "mixedcase",
  TITLECASE: "titlecase"
};

let splitCache;

/**
 * Class for Dev blocks
 * @constructor
 */
class FirDevBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    // util



    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'firDev',
            name: 'Fir\'s Test Extension',
            color1: '#f57542',
            color2: '#f55d42',
            blocks: [
              {
                  blockType: BlockType.LABEL,
                  text: "Utility boolean blocks"
              },
              {
                opcode: 'equalsExactly',
                blockType: BlockType.BOOLEAN,
                text: '[ONE] === [TWO]',
                arguments: {
                  ONE: {
                    type: ArgumentType.STRING,
                    defaultValue: 'apple'
                  },
                  TWO: {
                    type: ArgumentType.STRING,
                    defaultValue: 'banana'
                  }
                }
              },
              {
                opcode: 'notEqualTo',
                blockType: BlockType.BOOLEAN,
                text: '[INPUTA] ≠ [INPUTB]',
                arguments: {
                  INPUTA: {
                    type: ArgumentType.STRING,
                    defaultValue: 'apple'
                  },
                  INPUTB: {
                    type: ArgumentType.STRING,
                    defaultValue: 'banana'
                  }
                }
              },
              {
                opcode: 'moreThanEqual',
                blockType: BlockType.BOOLEAN,
                text: '[INPUTA] ≥ [INPUTB]',
                arguments: {
                  INPUTA: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '16'
                  },
                  INPUTB: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '25'
                  }
                }
              },
              {
                opcode: 'lessThanEqual',
                blockType: BlockType.BOOLEAN,
                text: '[INPUTA] ≤ [INPUTB]',
                arguments: {
                  INPUTA: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '16'
                  },
                  INPUTB: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '25'
                  }
                }
              },
              {
                  blockType: BlockType.LABEL,
                  text: "Browser interaction"
              },
              {
                opcode: 'alertBlock',
                blockType: BlockType.COMMAND,
                text: 'alert [STRING]',
                arguments: {
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: 'A red spy is in the base!'
                  }
                }
              },
              {
                opcode: 'inputPromptBlock',
                blockType: BlockType.REPORTER,
                text: 'prompt [STRING]',
                disableMonitor: true,
                arguments: {
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: 'The code is 1, 1, 1.. err... 1!'
                  }
                }
              },
              {
                opcode: 'confirmationBlock',
                blockType: BlockType.BOOLEAN,
                text: 'confirm [STRING]',
                arguments: {
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: 'Are you the red spy?'
                  }
                }
              },
              {
                opcode: 'popupWindowBlock',
                blockType: BlockType.COMMAND,
                text: 'popup window from url: [url]',
                arguments: {
                  url: {
                    type: ArgumentType.STRING,
                    defaultValue: 'https://google.com'
                  }
                }
              },
                
              {
                opcode: 'setClipboard',
                blockType: BlockType.COMMAND,
                text: 'set [STRING] to clipboard',
                arguments: {
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: 'apple',
                  }
                }
              },
              {
                opcode: 'readClipboard',
                blockType: BlockType.REPORTER,
                text: 'clipboard'
              },
              {
                opcode: 'isUserMobile',
                blockType: BlockType.BOOLEAN,
                text: 'is mobile?'
              },
              {
                opcode: 'screenReporter',
                blockType: BlockType.REPORTER,
                text: 'screen [DROPDOWN]',
                disableMonitor: true,
                arguments: {
                  DROPDOWN: {
                    type: ArgumentType.STRING,
                    defaultValue: 'width',
                    menu: 'screenReporterMenu'
                  }
                }
              },
              {
                opcode: 'windowReporter',
                blockType: BlockType.REPORTER,
                text: 'window [DROPDOWN]',
                disableMonitor: true,
                arguments: {
                  DROPDOWN: {
                    type: ArgumentType.STRING,
                    defaultValue: 'width',
                    menu: 'screenReporterMenu'
                  }
                }
              },
              {
                opcode: 'osBrowserDetails',
                blockType: BlockType.REPORTER,
                text: '[DROPDOWN]',
                disableMonitor: true,
                arguments: {
                  DROPDOWN: {
                    type: ArgumentType.STRING,
                    defaultValue: 'operating system',
                    menu: 'osBrowserMenu'
                  }
                }
              },
              '---',
              '---',
              {
                opcode: 'set_turbo',
                blockType: BlockType.COMMAND,
                text: 'set turbo mode to [ENABLED]',
                arguments: {
                  ENABLED: {
                    type: ArgumentType.STRING,
                    menu: 'trueFalseMenu'
                  }
                }
              },
              '---',
              '---',
              {
                  opcode: 'setBlurEffect',
                  text: 'set blur [PX]px',
                  blockType: BlockType.COMMAND,
                  arguments: {
                      PX: { type: ArgumentType.NUMBER, defaultValue: 0 }
                  }
              },
              {
                opcode: 'fetch',
                text: 'fetch [URL]',
                blockType: BlockType.REPORTER,
                arguments: {
                  URL: {
                    type: ArgumentType.STRING,
                     defaultValue: 'https://extensions.turbowarp.org/hello.txt'
                  }
                }
              },
              '---',
              {
                  blockType: BlockType.LABEL,
                  text: "Text utilities"
              },
              {
                opcode: "split",
                blockType: BlockType.REPORTER,
                text: "item [ITEM] of [STRING] split by [SPLIT]",
                arguments: {
                  ITEM: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 3
                  },
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "apple"
                  },
                  SPLIT: {
                    type: ArgumentType.STRING,
                    defaultValue: "p"
                  }
                }
              },
              {
                opcode: "count",
                blockType: BlockType.REPORTER,
                text: "count number of [SUBSTRING]s in [STRING]",
                arguments: {
                  SUBSTRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "p"
                  },
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "apple"
                  }
                }
              },
              {
                opcode: "indexof",
                blockType: BlockType.REPORTER,
                text: "index of [SUBSTRING] in [STRING]",
                arguments: {
                  SUBSTRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "p"
                  },
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "apple"
                  }
                }
              },

              "---",

              {
                opcode: "replace",
                blockType: BlockType.REPORTER,
                text: "replace [SUBSTRING] in [STRING] with [REPLACE]",
                arguments: {
                  SUBSTRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "world"
                  },
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "Hello world!"
                  },
                  REPLACE: {
                    type: ArgumentType.STRING,
                    defaultValue: "fellow Scratchers"
                  }
                }
              },
              {
                opcode: "repeat",
                blockType: BlockType.REPORTER,
                text: "repeat [STRING] [REPEAT] times",
                arguments: {
                  STRING: {
                    type: ArgumentType.STRING,
                    defaultValue: "apple "
                  },
                  REPEAT: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 3
                  }
                }
              }
            ],
            menus: {
                trueFalseMenu: {
                acceptReporters: true,
                items: [
                  {
                    text: 'true',
                    value: 'true'
                  },
                  {
                    text: 'false',
                    value: 'false'
                  },
                  {
                    text: 'random',
                    value: 'random',
                  }
                ]
              },
              screenReporterMenu: {
                acceptReporters: true,
                items: [
                  {
                    text: 'width',
                    value: 'width'
                  },
                  {
                    text: 'height',
                    value: 'height'
                  }
                ]
              },
              windowReporterMenu: {
                acceptReporters: true,
                items: [
                  {
                    text: 'width',
                    value: 'width'
                  },
                  {
                    text: 'height',
                    value: 'height'
                  }
                ]
              }
            }
        };
    }

    
	basicPopup(url) {
        popupWindow = window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
        
	}
    
    // blocks

    equalsExactly(args) {
      return args.ONE === args.TWO;
    }
    
    notEqualTo(args) {
      return (args.INPUTA != args.INPUTB);
    }

    moreThanEqual(args) {
      return (args.INPUTA >= args.INPUTB);
    }

    lessThanEqual(args) {
      return (args.INPUTA <= args.INPUTB);
    }
  
    alertBlock(args) {
      alert(args.STRING);
    }

    inputPromptBlock(args) {
      return prompt(args.STRING);
    }

    confirmationBlock(args) {
      if (confirm(args.STRING)) {
        return true;
      } else {
        return false;
      }
    }
    
    popupWindowBlock(args) {
      try {
        window.open(args.url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      } catch (error) {
        return "Invald url (or dev dumb-dumb and there is a bug)"
      }
    }
    
    set_turbo(args) {
      vm.setTurboMode(args.ENABLED);
    }    
    
    setBlurEffect(args, util) {
        const PX = Cast.toNumber(args.PX)
        util.target.setEffect("blur", PX)
    }
    
    screenReporter(args) {
      if (args.DROPDOWN === 'width') {
        return screen.width;
      }
      if (args.DROPDOWN === 'height') {
        return screen.height;
      }
    }

    windowReporter(args) {
      if (args.DROPDOWN === 'width') {
        return window.innerWidth;
      }
      if (args.DROPDOWN === 'height') {
        return window.innerHeight;
      }
    }

    osBrowserDetails(args) {
      var user = navigator.userAgent;
      if (args.DROPDOWN === 'operating system') {
        if (user.includes('Mac OS')) {
          return 'macOS';
        }
        if (user.includes('CrOS')) {
          return 'ChromeOS';
        }
        if (user.includes('Linux')) {
          return 'Linux';
        }
        if (user.includes('Windows')) {
          return 'Windows';
        }
        if (user.includes('iPad')) {
          return 'iOS';
        }
        if (user.includes('iPod')) {
          return 'iOS';
        }
        if (user.includes('iPhone')) {
          return 'iOS';
        }
        if (user.includes('Android')) {
          return 'Android';
        }
        return 'Other';
      }
      if (args.DROPDOWN === 'browser') {
        if (user.includes('Chrome')) {
          return 'Chrome';
        }
        if (user.includes('MSIE')) {
          return 'Internet Explorer';
        }
        if (user.includes('rv:')) {
          return 'Internet Explorer';
        }
        if (user.includes('Firefox')) {
          return 'Firefox';
        }
        if (user.includes('Safari')) {
          return 'Safari';
        }
        return 'Other';
      }
    }
    
    setClipboard(args) {
      navigator.clipboard.writeText(args.STRING);
    }

    readClipboard(args) {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return navigator.clipboard.readText();
      }
      return '';
    }
    
    count(args, util) {
      //.toLowerCase() for case insensitivity
      args.STRING = args.STRING.toString().toLowerCase();
      args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();

      return args.STRING.split(args.SUBSTRING).length - 1;
    }

    _caseInsensitiveRegex(str) {
      return new RegExp(
        str.replaceAll(/[^a-zA-Z0-9]/g, "\\$&"),
        "gi"
      );
    }

    split(args, util) {
      args.STRING = args.STRING.toString();
      args.SPLIT = args.SPLIT.toString();
      args.ITEM = Number(args.ITEM) || 0;

      // Cache the last split
      if (!(
        splitCache &&
        splitCache.string === args.STRING &&
        splitCache.split === args.SPLIT
      )) {
        const regex = this._caseInsensitiveRegex(args.SPLIT);

        splitCache = {
          string: args.STRING,
          split: args.SPLIT,
          arr: args.STRING.split(regex)
        };
      }
      return splitCache.arr[args.ITEM - 1] || "";
    }

    replace(args, util) {
      args.STRING = args.STRING.toString();
      args.SUBSTRING = args.SUBSTRING.toString();

      args.REPLACE = args.REPLACE.toString();

      const regex = this._caseInsensitiveRegex(args.SUBSTRING);

      return args.STRING.replace(regex, args.REPLACE);
    }

    indexof(args, util) {
      // .toLowerCase() for case insensitivity
      args.STRING = args.STRING.toString().toLowerCase();
      args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();

      // Since both arguments are casted to strings beforehand,
      // we don't have to worry about type differences
      // like in the item number of in list block
      const found = args.STRING.indexOf(args.SUBSTRING);

      // indexOf returns -1 when no matches are found
      return found === -1 ? 0 : found + 1;
    }

    repeat(args, util) {
      args.STRING = args.STRING.toString();
      args.REPEAT = Number(args.REPEAT) || 0;
      return args.STRING.repeat(args.REPEAT);
    }

    replaceRegex(args, util) {
      try {
        args.STRING = args.STRING.toString();
        args.REPLACE = args.REPLACE.toString();
        args.REGEX = args.REGEX.toString();
        args.FLAGS = args.FLAGS.toString();

        return args.STRING.replace(
          new RegExp(args.REGEX, args.FLAGS),
          args.REPLACE
        );
      } catch (e) {
        console.error(e);
        return "";
      }
    }
    fetch (args) {
        return fetch(args.URL)
          .then((response) => {
            return response.text();
          })
          .catch((error) => {
            console.error(error);
            return 'Uh oh! Something went wrong.';
          });
    }
}

module.exports = FirDevBlocks;
