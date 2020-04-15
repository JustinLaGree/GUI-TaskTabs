// override http module to include access for user-email, user-name in headers
declare module 'http' {
    interface IncomingHttpHeaders {
        "user-email"?: string;
        "user-name"?: string;
    }
}