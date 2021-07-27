/**
 * Generic Document Template with basic fields as base for other models
 * @interface
 * @prop {ObjectId} _id         - ID of document
 * @prop {ObjectId} createdBy   - ID of user who created document
 * @prop {Date} createdAt       - date of object creation
 * @prop {Date} updatedAt       - date of last object update
 * @prop {integer} __v          - version number of document
 */
export interface Document {
  readonly _id: string;
  readonly createdBy?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly __v?: number;
}

export interface OrganisationDocument extends Document {
  readonly organisation?: string;
}
