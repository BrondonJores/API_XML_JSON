<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:meal="http://canteen.com/meal">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <!-- Template principal -->
    <xsl:template match="/meal:meals">
        <html>
            <head>
                <title>Menu de la Cantine</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background-color: #f5f5f5;
                    }
                    h1 {
                        color: #333;
                        border-bottom: 3px solid #4f46e5;
                        padding-bottom: 10px;
                    }
                    .category {
                        margin: 30px 0;
                    }
                    .category h2 {
                        color: #4f46e5;
                        margin-bottom: 15px;
                    }
                    .meal {
                        background: white;
                        padding: 15px;
                        margin: 10px 0;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .meal h3 {
                        margin: 0 0 10px 0;
                        color: #333;
                    }
                    .price {
                        color: #10b981;
                        font-weight: bold;
                        font-size: 1.2em;
                    }
                    .description {
                        color: #666;
                        margin: 10px 0;
                    }
                    .allergens {
                        color: #ef4444;
                        font-size: 0.9em;
                        margin-top: 10px;
                    }
                    .nutritional {
                        background: #f9fafb;
                        padding: 10px;
                        margin-top: 10px;
                        border-radius: 4px;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <h1>Menu de la Cantine</h1>
                <xsl:apply-templates select="meal:meal"/>
            </body>
        </html>
    </xsl:template>
    
    <!-- Template pour chaque plat -->
    <xsl:template match="meal:meal">
        <div class="meal">
            <h3><xsl:value-of select="meal:name"/></h3>
            <div class="price"><xsl:value-of select="meal:price"/> EUR</div>
            <xsl:if test="meal:description">
                <div class="description"><xsl:value-of select="meal:description"/></div>
            </xsl:if>
            
            <xsl:if test="meal:nutritionalInfo">
                <div class="nutritional">
                    <strong>Informations nutritionnelles:</strong><br/>
                    Calories: <xsl:value-of select="meal:nutritionalInfo/meal:calories"/> kcal |
                    Proteines: <xsl:value-of select="meal:nutritionalInfo/meal:protein"/>g |
                    Glucides: <xsl:value-of select="meal:nutritionalInfo/meal:carbs"/>g |
                    Lipides: <xsl:value-of select="meal:nutritionalInfo/meal:fat"/>g
                </div>
            </xsl:if>
            
            <xsl:if test="meal:allergens">
                <div class="allergens">
                    <strong>Allergenes:</strong>
                    <xsl:for-each select="meal:allergens/meal:allergen">
                        <xsl:value-of select="."/>
                        <xsl:if test="position() != last()">, </xsl:if>
                    </xsl:for-each>
                </div>
            </xsl:if>
        </div>
    </xsl:template>
    
</xsl:stylesheet>
