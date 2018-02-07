import jsPDF from 'jspdf'

class Pdf {
	constructor(){
		this.doc
	}

	instantiatePDF(){
		this.doc = new jsPDF({
			orientation: 'landscape',
			format: [60, 90]
		});
		this.doc.text('This is the cover!', 1, 1)
	}

	addPageToPDF(imgData) {
	  this.doc.addPage();
	  this.doc.addImage(imgData, 'JPEG', 30, 10, 80, 60, 'monkey');
	}

	savePDF(){
	  this.doc.save('two-by-four.pdf')
	}
}

export
default Pdf;