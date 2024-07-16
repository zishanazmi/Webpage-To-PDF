function convertToPDF() {
    const element = document.body; // or document.getElementById('pdf-content')
    
    html2pdf()
        .from(element)
        .set({
            margin: 0,
            filename: 'webpage.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
            },
            jsPDF: {
                unit: 'pt',
                format: 'a4',
                orientation: 'landscape'
            }
        })
        .save();
}

// Wait for the libraries to be loaded
if (window.html2pdf) {
    convertToPDF();
} else {
    const checkLibrariesLoaded = setInterval(() => {
        if (window.html2pdf) {
            clearInterval(checkLibrariesLoaded);
            convertToPDF();
        }
    }, 100);
}
