<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:o="http://canteen.com/order">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <!-- Template principal pour la commande -->
    <xsl:template match="/o:order">
        <html>
            <head>
                <title>Facture - Commande #<xsl:value-of select="o:id"/></title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .invoice {
                        background-color: white;
                        padding: 40px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                        border-bottom: 3px solid #3498db;
                        padding-bottom: 20px;
                    }
                    .header h1 {
                        color: #2c3e50;
                        margin: 0;
                    }
                    .header .company {
                        color: #7f8c8d;
                        margin-top: 5px;
                    }
                    .info-section {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                    }
                    .info-box {
                        flex: 1;
                    }
                    .info-box h3 {
                        color: #3498db;
                        margin-bottom: 10px;
                        font-size: 14px;
                        text-transform: uppercase;
                    }
                    .info-box p {
                        margin: 5px 0;
                        color: #555;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    th {
                        background-color: #3498db;
                        color: white;
                        padding: 12px;
                        text-align: left;
                        font-weight: bold;
                    }
                    td {
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                    }
                    tr:hover {
                        background-color: #f9f9f9;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .totals {
                        margin-top: 20px;
                        text-align: right;
                    }
                    .totals-row {
                        display: flex;
                        justify-content: flex-end;
                        padding: 10px 0;
                        border-top: 1px solid #ddd;
                    }
                    .totals-label {
                        font-weight: bold;
                        margin-right: 20px;
                        min-width: 150px;
                    }
                    .totals-value {
                        min-width: 100px;
                        text-align: right;
                    }
                    .grand-total {
                        font-size: 20px;
                        color: #27ae60;
                        border-top: 3px solid #3498db;
                        margin-top: 10px;
                        padding-top: 15px;
                    }
                    .status {
                        display: inline-block;
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .status-pending { background-color: #f39c12; color: white; }
                    .status-preparing { background-color: #3498db; color: white; }
                    .status-ready { background-color: #27ae60; color: white; }
                    .status-completed { background-color: #95a5a6; color: white; }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                        color: #7f8c8d;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="invoice">
                    <div class="header">
                        <h1>FACTURE</h1>
                        <div class="company">Cantine Intelligente</div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-box">
                            <h3>Informations Commande</h3>
                            <p><strong>N° Commande:</strong> #<xsl:value-of select="o:id"/></p>
                            <p><strong>Date:</strong> <xsl:value-of select="substring(o:created_at, 1, 10)"/></p>
                            <p><strong>Statut:</strong> 
                                <span class="status status-{o:status}">
                                    <xsl:value-of select="o:status"/>
                                </span>
                            </p>
                        </div>
                        <div class="info-box">
                            <h3>Client</h3>
                            <p><strong>ID Utilisateur:</strong> #<xsl:value-of select="o:user_id"/></p>
                            <xsl:if test="o:pickup_time">
                                <p><strong>Heure de retrait:</strong> <xsl:value-of select="o:pickup_time"/></p>
                            </xsl:if>
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th class="text-right">Quantité</th>
                                <th class="text-right">Prix Unitaire</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="o:items/o:item">
                                <tr>
                                    <td><xsl:value-of select="o:meal_name"/></td>
                                    <td class="text-right"><xsl:value-of select="o:quantity"/></td>
                                    <td class="text-right"><xsl:value-of select="format-number(o:price, '#,##0.00')"/> €</td>
                                    <td class="text-right">
                                        <xsl:value-of select="format-number(o:quantity * o:price, '#,##0.00')"/> €
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                    
                    <div class="totals">
                        <div class="totals-row grand-total">
                            <div class="totals-label">TOTAL A PAYER</div>
                            <div class="totals-value">
                                <xsl:value-of select="format-number(o:total, '#,##0.00')"/> €
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        Merci de votre commande ! - Cantine Intelligente
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>
