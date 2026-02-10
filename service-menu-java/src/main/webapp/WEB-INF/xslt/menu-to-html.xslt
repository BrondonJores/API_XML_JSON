<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/menu">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Menu de la Cantine</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background-color: #f5f5f5;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    .meal-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                        margin-top: 20px;
                    }
                    .meal-card {
                        background: white;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .meal-name {
                        font-size: 1.5em;
                        font-weight: bold;
                        color: #2c3e50;
                        margin-bottom: 10px;
                    }
                    .meal-description {
                        color: #666;
                        margin-bottom: 10px;
                    }
                    .meal-price {
                        font-size: 1.2em;
                        color: #27ae60;
                        font-weight: bold;
                    }
                    .meal-category {
                        display: inline-block;
                        background: #3498db;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 0.9em;
                        margin-bottom: 10px;
                    }
                    .nutritional-info {
                        margin-top: 15px;
                        padding: 10px;
                        background: #ecf0f1;
                        border-radius: 4px;
                    }
                    .nutritional-info h4 {
                        margin-top: 0;
                        color: #2c3e50;
                    }
                    .allergens {
                        margin-top: 10px;
                    }
                    .allergen-tag {
                        display: inline-block;
                        background: #e74c3c;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 0.8em;
                        margin-right: 5px;
                        margin-top: 5px;
                    }
                    .available {
                        color: #27ae60;
                        font-weight: bold;
                    }
                    .unavailable {
                        color: #e74c3c;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <h1>Menu de la Cantine</h1>
                <div class="meal-container">
                    <xsl:apply-templates select="meals/meal"/>
                </div>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="meal">
        <div class="meal-card">
            <xsl:if test="category/name">
                <span class="meal-category">
                    <xsl:value-of select="category/name"/>
                </span>
            </xsl:if>
            
            <div class="meal-name">
                <xsl:value-of select="name"/>
            </div>
            
            <xsl:if test="description">
                <div class="meal-description">
                    <xsl:value-of select="description"/>
                </div>
            </xsl:if>
            
            <div class="meal-price">
                <xsl:value-of select="format-number(price, '#,##0.00')"/> €
            </div>
            
            <div>
                <xsl:choose>
                    <xsl:when test="available = 'true'">
                        <span class="available">Disponible</span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span class="unavailable">Non disponible</span>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            
            <xsl:if test="nutritionalInfo">
                <div class="nutritional-info">
                    <h4>Informations nutritionnelles</h4>
                    <div>Calories: <xsl:value-of select="nutritionalInfo/calories"/> kcal</div>
                    <div>Protéines: <xsl:value-of select="nutritionalInfo/proteins"/> g</div>
                    <div>Glucides: <xsl:value-of select="nutritionalInfo/carbohydrates"/> g</div>
                    <div>Lipides: <xsl:value-of select="nutritionalInfo/fats"/> g</div>
                    <xsl:if test="nutritionalInfo/fiber">
                        <div>Fibres: <xsl:value-of select="nutritionalInfo/fiber"/> g</div>
                    </xsl:if>
                </div>
            </xsl:if>
            
            <xsl:if test="allergens/allergen">
                <div class="allergens">
                    <strong>Allergènes:</strong><br/>
                    <xsl:for-each select="allergens/allergen">
                        <span class="allergen-tag">
                            <xsl:value-of select="name"/>
                        </span>
                    </xsl:for-each>
                </div>
            </xsl:if>
        </div>
    </xsl:template>

</xsl:stylesheet>
