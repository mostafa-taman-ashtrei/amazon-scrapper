"use server";

import { EmailContentType } from "@/types/email";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL!,
};


export const sendEmail = async (emailContent: EmailContentType, sendTo: string[]) => {
    const oAuth2Client = new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirectUrl
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGE_REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();


    const transport = nodemailer.createTransport({
        // @ts-ignore
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "alpha.academy.ytchannel@gmail.com",
            clientId: googleConfig.clientId,
            clientSecret: googleConfig.clientSecret,
            refreshToken: process.env.GOOGE_REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    try {
        await transport.sendMail(
            {
                from: "Amazon Scrapper",
                to: sendTo,
                html: emailContent.body,
                subject: emailContent.subject,
            }
        );
    } catch {
        throw new Error("Failed to send an email");
    }


};