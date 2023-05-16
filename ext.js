class pbpp {
  getInfo() {
    return {
      id: 'pbpp',
      name: 'PenguinBrowser++',
      color1: '#0052a9',
      color2: '#004488',
      blocks: [
//         {
//           opcode: 'wait',
//           text: 'wait [TIME] seconds',
//           blockType: Scratch.BlockType.COMMAND,
//           arguments: {
//             TIME: {
//               type: Scratch.ArgumentType.NUMBER,
//               defaultValue: 1
//             }
//           }
//         },
        {
          opcode: 'fetch',
          text: 'fetch [URL]',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/hello.txt'
            }
          }
        }
      ]
    };
  }

//   wait (args) {
//     return new Promise((resolve, reject) => {
//       const timeInMilliseconds = args.TIME * 1000;
//       setTimeout(() => {
//         resolve();
//       }, timeInMilliseconds);
//     });
//   }

  fetch (args) {
    return fetch(args.URL,{
      method: 'GET',
      mode: 'no-cors'
    })
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });
  }
}
Scratch.extensions.register(new pbpp());
