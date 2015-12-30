<?xml version="1.0" encoding='utf-8'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" indent="yes" />
	<xsl:template match="/xml/data">
		<table width="100%">
			<thead>
				<tr>
					<td>id</td>
					<td>name</td>
					<td>description</td>
				</tr>
			</thead>
			<tbody>
				<xsl:for-each select="./rec">
					<xsl:element name="tr">
						<xsl:variable name="row" select="./field" />
						<td valign='top'>
							<xsl:value-of select="$row[@name='id']" />
						</td>
						<td valign='top'>
							<xsl:value-of select="$row[@name='name']" />
						</td>
						<td valign='top'>
							<xsl:value-of select="$row[@name='descriptor']" />
						</td>
					</xsl:element>
				</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>

</xsl:stylesheet>
