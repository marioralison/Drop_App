interface IUser{
    id: number;
    firstname: string;
    lastname: string;
    region: string;
    country: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    preference_product: string;
    role: UserRole
}



enum UserRole {
    SELLER="SELLER",
    BUYER="BUYER"
}

export {
    IUser,
    UserRole
}