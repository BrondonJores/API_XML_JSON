<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:order="http://canteen.com/order"
                exclude-result-prefixes="order">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/order:order">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Facture Commande #<xsl:value-of select="order:id"/></title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .invoice-header {
                        text-align: center;
                        border-bottom: 3px solid #2c3e50;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .invoice-title {
                        font-size: 2.5em;
                        color: #2c3e50;
                        margin: 0;
                    }
                    .invoice-number {
                        color: #7f8c8d;
                        font-size: 1.2em;
                    }
                    .invoice-info {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin-bottom: 30px;
                    }
                    .info-box {
                        background-color: #ecf0f1;
                        padding: 15px;
                        border-radius: 5px;
                    }
                    .info-label {
                        font-weight: bold;
                        color: #2c3e50;
                    }
                    .items-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    .items-table th {
                        background-color: #34495e;
                        color: white;
                        padding: 12px;
                        text-align: left;
                    }
                    .items-table td {
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                    }
                    .items-table tr:hover {
                        background-color: #f5f5f5;
                    }
                    .total-section {
                        text-align: right;
                        font-size: 1.5em;
                        padding: 20px;
                        background-color: #2c3e50;
                        color: white;
                        border-radius: 5px;
                    }
                    .status-badge {
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-weight: bold;
                        display: inline-block;
                    }
                    .status-pending { background-color: #f39c12; color: white; }
                    .status-preparing { background-color: #3498db; color: white; }
                    .status-ready { background-color: #2ecc71; color: white; }
                    .status-completed { background-color: #27ae60; color: white; }
                    .status-cancelled { background-color: #e74c3c; color: white; }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 2px solid #ddd;
                        color: #7f8c8d;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-header">
                    <h1 class="invoice-title">FACTURE</h1>
                    <p class="invoice-number">Commande #<xsl:value-of select="order:id"/></p>
                </div>
                
                <div class="invoice-info">
                    <div class="info-box">
                        <div class="info-label">Client:</div>
                        <div>ID Utilisateur: <xsl:value-of select="order:userId"/></div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Date:</div>
                        <div><xsl:value-of select="order:createdAt"/></div>
                        <xsl:if test="order:pickupTime">
                            <div class="info-label" style="margin-top: 10px;">Heure de retrait:</div>
                            <div><xsl:value-of select="order:pickupTime"/></div>
                        </xsl:if>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <span class="info-label">Statut: </span>
                    <span class="status-badge status-{order:status}">
                        <xsl:value-of select="order:status"/>
                    </span>
                </div>
                
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Article</th>
                            <th>Prix Unitaire</th>
                            <th>Quantite</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:apply-templates select="order:items/order:item"/>
                    </tbody>
                </table>
                
                <div class="total-section">
                    <strong>TOTAL: </strong>
                    <xsl:value-of select="format-number(order:total, '#,##0.00')"/> EUR
                </div>
                
                <div class="footer">
                    <p>Merci pour votre commande!</p>
                    <p>Systeme de Cantine Intelligente</p>
                </div>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="order:item">
        <tr>
            <td><xsl:value-of select="order:mealName"/></td>
            <td><xsl:value-of select="format-number(order:price, '#,##0.00')"/> EUR</td>
            <td><xsl:value-of select="order:quantity"/></td>
            <td><xsl:value-of select="format-number(order:price * order:quantity, '#,##0.00')"/> EUR</td>
        </tr>
    </xsl:template>
    
</xsl:stylesheet>
