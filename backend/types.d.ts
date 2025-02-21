export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName?: string;
    googleID?: string;
    facebookID?: string;
    avatar?: string;
    __confirmPassword: string;
}

export interface CocktailInterface {
    user: Types.ObjectId;
    title: string;
    description: string;
    image: string | null;
    ingredients: [
        { name: string,
        amount: string, }
    ]
    rating?: [
        { user: Types.ObjectId,
        rate: number}
    ]
}