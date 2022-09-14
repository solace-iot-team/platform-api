/* eslint-disable */


export type DmrClusterLinkAttribute = {
    /**
     * The name of the Attribute.
     */
    attributeName?: string;
    /**
     * The value of the Attribute.
     */
    attributeValue?: string;
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * The name of the node at the remote end of the Link.
     */
    remoteNodeName?: string;
}

export namespace DmrClusterLinkAttribute {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkAttribute';


}