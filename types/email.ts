export type NotificationType = | "WELCOME" | "CHANGE_OF_STOCK" | "LOWEST_PRICE" | "THRESHOLD_MET";

export interface EmailContentType {
    subject: string;
    body: string;
};

export interface EmailProductInfoType {
    title: string;
    url: string;
    image: string;
};