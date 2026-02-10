<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:m="http://canteen.com/menu">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <!-- Template principal pour le menu -->
    <xsl:template match="/m:menu">
        <html>
            <head>
                <title>Menu de la Cantine</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 1200px; 
                        margin: 0 auto; 
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    h1 { 
                        color: #2c3e50; 
                        text-align: center;
                        margin-bottom: 10px;
                    }
                    .date { 
                        text-align: center; 
                        color: #7f8c8d;
                        font-size: 18px;
                        margin-bottom: 30px;
                    }
                    .category { 
                        background-color: white;
                        margin-bottom: 30px; 
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    .category-header { 
                        background-color: #3498db;
                        color: white;
                        padding: 15px 20px;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .category-description {
                        padding: 10px 20px;
                        color: #7f8c8d;
                        background-color: #ecf0f1;
                    }
                    .meals { 
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                        padding: 20px;
                    }
                    .meal { 
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        padding: 15px;
                        background-color: #fafafa;
                        transition: transform 0.2s;
                    }
                    .meal:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                    }
                    .meal-name { 
                        font-size: 18px;
                        font-weight: bold;
                        color: #2c3e50;
                        margin-bottom: 10px;
                    }
                    .meal-description { 
                        color: #7f8c8d;
                        font-size: 14px;
                        margin-bottom: 10px;
                        line-height: 1.4;
                    }
                    .meal-price { 
                        font-size: 20px;
                        font-weight: bold;
                        color: #27ae60;
                    }
                    .meal-image {
                        width: 100%;
                        height: 150px;
                        object-fit: cover;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <h1>Menu de la Cantine</h1>
                <div class="date">
                    <xsl:text>Date: </xsl:text>
                    <xsl:value-of select="m:date"/>
                </div>
                
                <xsl:apply-templates select="m:categories/m:categoryWithMeals"/>
            </body>
        </html>
    </xsl:template>
    
    <!-- Template pour chaque categorie -->
    <xsl:template match="m:categoryWithMeals">
        <div class="category">
            <div class="category-header">
                <xsl:value-of select="m:category/m:name"/>
            </div>
            <xsl:if test="m:category/m:description">
                <div class="category-description">
                    <xsl:value-of select="m:category/m:description"/>
                </div>
            </xsl:if>
            <div class="meals">
                <xsl:apply-templates select="m:meals/m:meal"/>
            </div>
        </div>
    </xsl:template>
    
    <!-- Template pour chaque plat -->
    <xsl:template match="m:meal">
        <div class="meal">
            <xsl:if test="m:imageUrl">
                <img class="meal-image" src="{m:imageUrl}" alt="{m:name}"/>
            </xsl:if>
            <div class="meal-name">
                <xsl:value-of select="m:name"/>
            </div>
            <div class="meal-description">
                <xsl:value-of select="m:description"/>
            </div>
            <div class="meal-price">
                <xsl:value-of select="m:price"/>
                <xsl:text> €</xsl:text>
            </div>
        </div>
    </xsl:template>
    
</xsl:stylesheet>
