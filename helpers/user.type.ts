interface IUser{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    tel: string;
    region: string;
    pays: string;
    role: UserRole
    preference_product: string | null;
    adress: string | null;
    profile_url: string | null;
    code_postal: string | null;
    confirmPassword: string;
}



enum UserRole {
    SELLER="SELLER",
    BUYER="BUYER"
}

export {
    IUser,
    UserRole
}