/* eslint-disable */


export type MsgVpnCertMatchingRuleCondition = {
    /**
     * Client Username Attribute to be compared with certificate content. Either an attribute or an expression must be provided on creation, but not both. The default value is `""`.
     */
    attribute?: string;
    /**
     * Glob expression to be matched with certificate content. Either an expression or an attribute must be provided on creation, but not both. The default value is `""`.
     */
    expression?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the rule.
     */
    ruleName?: string;
    /**
     * Certificate field to be compared with the Attribute. The allowed values and their meaning are:
     *
     * <pre>
     * "certificate-thumbprint" - The attribute is computed as the SHA-1 hash over the entire DER-encoded contents of the client certificate.
     * "common-name" - The attribute is extracted from the certificate's first instance of the Common Name attribute in the Subject DN.
     * "common-name-last" - The attribute is extracted from the certificate's last instance of the Common Name attribute in the Subject DN.
     * "subject-alternate-name-msupn" - The attribute is extracted from the certificate's Other Name type of the Subject Alternative Name and must have the msUPN signature.
     * "uid" - The attribute is extracted from the certificate's first instance of the User Identifier attribute in the Subject DN.
     * "uid-last" - The attribute is extracted from the certificate's last instance of the User Identifier attribute in the Subject DN.
     * "org-unit" - The attribute is extracted from the certificate's first instance of the Org Unit attribute in the Subject DN.
     * "org-unit-last" - The attribute is extracted from the certificate's last instance of the Org Unit attribute in the Subject DN.
     * "issuer" - The attribute is extracted from the certificate's Issuer DN.
     * "subject" - The attribute is extracted from the certificate's Subject DN.
     * "serial-number" - The attribute is extracted from the certificate's Serial Number.
     * "dns-name" - The attribute is extracted from the certificate's Subject Alt Name DNSName.
     * "ip-address" - The attribute is extracted from the certificate's Subject Alt Name IPAddress.
     * </pre>
     *
     */
    source?: MsgVpnCertMatchingRuleCondition.source;
}

export namespace MsgVpnCertMatchingRuleCondition {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleCondition';

    /**
     * Certificate field to be compared with the Attribute. The allowed values and their meaning are:
     *
     * <pre>
     * "certificate-thumbprint" - The attribute is computed as the SHA-1 hash over the entire DER-encoded contents of the client certificate.
     * "common-name" - The attribute is extracted from the certificate's first instance of the Common Name attribute in the Subject DN.
     * "common-name-last" - The attribute is extracted from the certificate's last instance of the Common Name attribute in the Subject DN.
     * "subject-alternate-name-msupn" - The attribute is extracted from the certificate's Other Name type of the Subject Alternative Name and must have the msUPN signature.
     * "uid" - The attribute is extracted from the certificate's first instance of the User Identifier attribute in the Subject DN.
     * "uid-last" - The attribute is extracted from the certificate's last instance of the User Identifier attribute in the Subject DN.
     * "org-unit" - The attribute is extracted from the certificate's first instance of the Org Unit attribute in the Subject DN.
     * "org-unit-last" - The attribute is extracted from the certificate's last instance of the Org Unit attribute in the Subject DN.
     * "issuer" - The attribute is extracted from the certificate's Issuer DN.
     * "subject" - The attribute is extracted from the certificate's Subject DN.
     * "serial-number" - The attribute is extracted from the certificate's Serial Number.
     * "dns-name" - The attribute is extracted from the certificate's Subject Alt Name DNSName.
     * "ip-address" - The attribute is extracted from the certificate's Subject Alt Name IPAddress.
     * </pre>
     *
     */
    export enum source {
        CERTIFICATE_THUMBPRINT = 'certificate-thumbprint',
        COMMON_NAME = 'common-name',
        COMMON_NAME_LAST = 'common-name-last',
        SUBJECT_ALTERNATE_NAME_MSUPN = 'subject-alternate-name-msupn',
        UID = 'uid',
        UID_LAST = 'uid-last',
        ORG_UNIT = 'org-unit',
        ORG_UNIT_LAST = 'org-unit-last',
        ISSUER = 'issuer',
        SUBJECT = 'subject',
        SERIAL_NUMBER = 'serial-number',
        DNS_NAME = 'dns-name',
        IP_ADDRESS = 'ip-address',
    }


}