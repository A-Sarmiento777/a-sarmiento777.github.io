import { useState, useEffect } from "react";

export default function ElectronSpecific({ favourites, clearAllFav, agregarProductoAlCarritoFav }) {
  console.log('favourites', favourites)
  // Not needed in Vite, but in CRA
  const require = window.require;
  // Use ipcRenderer + remote that can connect to Electron
  // methods only available on the Node side otherwise
  const { ipcRenderer } = require('electron');
  const remote = require('@electron/remote');

  // Use dialog via remote
  const { dialog } = remote;

  // Use the fs and paths modules from node
  const fs = require('fs');
  const path = require('path');

  // State variables
  const [menuChoice, setMenuChoice] = useState('');

  useEffect(() => {
    // On mount of the component
    // add an event listener listening to the Electron main process
    // and the event sent from the main process called menuChoice
    ipcRenderer.on('menuChoice', (ipcEvent, choice) => {
      let fileExtensionToUse = 'json';
      if (choice === 'Save current wish list') {
        let filePath = dialog.showSaveDialogSync({
          properties: ['createDirectory']
        });

        if (filePath && favourites.length >= 0) {
          // add extension if missing
          if (
            filePath.slice(-fileExtensionToUse.length - 1) !==
            '.' + fileExtensionToUse
          ) {
            filePath += '.' + fileExtensionToUse;
          }
          console.log('favourites', typeof favourites)
          console.log('favourites', favourites.values)
          fs.writeFileSync(
            filePath,
            JSON.stringify({ textArea: localStorage.getItem('favourites') }),
            'utf-8'
          );
          localStorage.removeItem("favourites");
          clearAllFav(localStorage.getItem('email'))
        } else {
          console.log('Error! 1st add some products into cart')
        }
        // your logic and something with fs and path eventually to save
      }
      if (choice === 'Load a wish list') {
        let filePaths = dialog.showOpenDialogSync({
          properties: ['openFile'],
          options: { filters: { extensions: [fileExtensionToUse] } }
        });
        console.log(filePaths)
        if (filePaths) {
          let json = fs.readFileSync(filePaths[0], 'utf-8');
          console.log('json', json)
          let data = JSON.parse(json);
          console.log('data', data)
          let parsedData = JSON.parse(data.textArea);
          console.log('parsedData', parsedData)
          let filterData = parsedData?.filter(item => item.email === localStorage.getItem('email'))
          console.log('filterData', filterData)
          filterData?.map(a => agregarProductoAlCarritoFav(a?.id, a?.name, a?.price, a.type))
        }
        // your logic and something with fs and path eventually to load
      }
      setMenuChoice(choice);
    });

    // Return a function to run un unmount of the component
    // that will remove the ipcRenderer-listener
    return () => ipcRenderer.off('menuChoice');

  }, []);

  async function setElectronSpecificFn() {

  }

  return <>
    <p>Last menu choice: {menuChoice}</p>
  </>
}