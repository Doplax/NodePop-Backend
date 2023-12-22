// Librerias
const i18n = require('i18n')
const path = require('node:path')


// Instancia
i18n.configure({
    locales: ['en','es'],
    directory: path.join(__dirname, '..','locales'),
    defaultLocale: 'en',
    autoReload: true, // watch for changes in JSON files to relad locale on updates 
    syncFiles: true, // sync local files information across all files 

})

// Para script
i18n.setLocale('en') 



