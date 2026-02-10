from lxml import etree
import os
from datetime import datetime

class XSLTService:
    """Service de transformation XSLT"""
    
    def __init__(self):
        self.xslt_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'xslt')
        os.makedirs(self.xslt_dir, exist_ok=True)
        
        # Crée les fichiers XSLT s'ils n'existent pas
        self._ensure_xslt_files()
    
    def transform_order_to_invoice(self, order_xml):
        """Transforme une commande XML en facture XML"""
        try:
            xslt_path = os.path.join(self.xslt_dir, 'order_to_invoice.xslt')
            return self._apply_xslt_transform(order_xml, xslt_path)
        except Exception as e:
            raise ValueError(f"Erreur de transformation XSLT: {str(e)}")
    
    def transform_orders_to_stats(self, orders_xml):
        """Transforme plusieurs commandes XML en statistiques"""
        try:
            xslt_path = os.path.join(self.xslt_dir, 'orders_to_stats.xslt')
            return self._apply_xslt_transform(orders_xml, xslt_path)
        except Exception as e:
            raise ValueError(f"Erreur de transformation XSLT: {str(e)}")
    
    def _apply_xslt_transform(self, xml_string, xslt_path):
        """Applique une transformation XSLT sur un XML"""
        xml_doc = etree.fromstring(xml_string.encode('utf-8'))
        
        with open(xslt_path, 'r') as xslt_file:
            xslt_doc = etree.parse(xslt_file)
            transform = etree.XSLT(xslt_doc)
        
        result = transform(xml_doc)
        return str(result)
    
    def _ensure_xslt_files(self):
        """Crée les fichiers XSLT par défaut s'ils n'existent pas"""
        
        # XSLT pour transformer commande en facture
        invoice_xslt = """<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="/order">
        <invoice>
            <invoice_number>
                <xsl:text>INV-</xsl:text>
                <xsl:value-of select="id"/>
            </invoice_number>
            <customer_id>
                <xsl:value-of select="user_id"/>
            </customer_id>
            <issue_date>
                <xsl:value-of select="created_at"/>
            </issue_date>
            <total_amount>
                <xsl:value-of select="total_price"/>
            </total_amount>
            <status>
                <xsl:choose>
                    <xsl:when test="status = 'completed'">paid</xsl:when>
                    <xsl:otherwise>pending</xsl:otherwise>
                </xsl:choose>
            </status>
            <line_items>
                <xsl:for-each select="items/item">
                    <line_item>
                        <item_id>
                            <xsl:value-of select="menu_item_id"/>
                        </item_id>
                        <quantity>
                            <xsl:value-of select="quantity"/>
                        </quantity>
                        <unit_price>
                            <xsl:value-of select="price"/>
                        </unit_price>
                        <subtotal>
                            <xsl:value-of select="price * quantity"/>
                        </subtotal>
                    </line_item>
                </xsl:for-each>
            </line_items>
        </invoice>
    </xsl:template>
</xsl:stylesheet>"""
        
        # XSLT pour générer des statistiques
        stats_xslt = """<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="/orders">
        <statistics>
            <total_orders>
                <xsl:value-of select="count(order)"/>
            </total_orders>
            <total_revenue>
                <xsl:value-of select="sum(order/total_price)"/>
            </total_revenue>
            <average_order_value>
                <xsl:value-of select="sum(order/total_price) div count(order)"/>
            </average_order_value>
            <total_items_sold>
                <xsl:value-of select="sum(order/items/item/quantity)"/>
            </total_items_sold>
            <orders_by_status>
                <pending>
                    <xsl:value-of select="count(order[status='pending'])"/>
                </pending>
                <processing>
                    <xsl:value-of select="count(order[status='processing'])"/>
                </processing>
                <completed>
                    <xsl:value-of select="count(order[status='completed'])"/>
                </completed>
                <cancelled>
                    <xsl:value-of select="count(order[status='cancelled'])"/>
                </cancelled>
            </orders_by_status>
        </statistics>
    </xsl:template>
</xsl:stylesheet>"""
        
        invoice_path = os.path.join(self.xslt_dir, 'order_to_invoice.xslt')
        if not os.path.exists(invoice_path):
            with open(invoice_path, 'w') as f:
                f.write(invoice_xslt)
        
        stats_path = os.path.join(self.xslt_dir, 'orders_to_stats.xslt')
        if not os.path.exists(stats_path):
            with open(stats_path, 'w') as f:
                f.write(stats_xslt)
