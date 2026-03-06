import { jsPDF } from 'jspdf';

export interface InsightData {
    title: string;
    description: string;
    severity: string;
    confidence: string;
}

export const generateInsightPDF = (insights: InsightData[]) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = 40;

    // --- Header ---
    doc.setFillColor(26, 11, 46); // Deep purple background for header
    doc.rect(0, 0, pageWidth, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('URBAN RESPONSE AI', margin, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('STRATEGIC INFRASTRUCTURE INSIGHTS REPORT', margin + 1, 26);

    doc.setFontSize(8);
    const date = new Date().toLocaleDateString();
    doc.text(`DATE: ${date}`, pageWidth - margin - 25, 20);

    // --- Body ---
    doc.setTextColor(0, 0, 0); // Reset to black for content
    insights.forEach((insight, index) => {
        // Add new page if content exceeds page height
        if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = 30; // Reset yPos for new page
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${insight.title.toUpperCase()}`, margin, yPos);
        yPos += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const descriptionLines = doc.splitTextToSize(insight.description, pageWidth - (margin * 2));
        doc.text(descriptionLines, margin, yPos);
        yPos += (descriptionLines.length * 5) + 5;

        // Details row
        doc.setFontSize(9);
        doc.setTextColor(168, 85, 247); // Neon purple color
        doc.text(`SEVERITY: ${insight.severity.toUpperCase()}`, margin, yPos);
        doc.text(`CONFIDENCE: ${insight.confidence}`, margin + 60, yPos);

        yPos += 15;
        doc.setTextColor(0, 0, 0); // Reset

        // Separator line
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, yPos - 10, pageWidth - margin, yPos - 10);
    });

    // --- Footer ---
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        // Footer bar
        doc.setFillColor(245, 245, 245);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text('DEVELOPED BY SMART NOVA', margin, pageHeight - 8);

        doc.setFont('helvetica', 'normal');
        doc.text(`PAGE ${i} OF ${totalPages}`, pageWidth - margin - 20, pageHeight - 8);
    }

    doc.save(`UrbanResponse_Insights_${new Date().toISOString().split('T')[0]}.pdf`);
};
