export const validateRole = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "mahasiswa";
        case 3:
            return "dosen";
    }
};

export const validateHeader = (role) => {
    switch (role) {
        case 1:
            return "admin";
        case 2:
            return "mahasiswa";
        case 3:
            return "dosen";
    }
};
