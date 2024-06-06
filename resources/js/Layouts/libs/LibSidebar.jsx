import { validateRole } from "@/Components/Example";

export const MenuDashboardValidate = (user) => {
    const MenuAdminDashboard = [
        {
            name: "Dashboard",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-home",
        },
        {
            name: "Dosen",
            url: `/${validateRole(user?.role_id)}/dosen`,
            icon: "fas fa-chalkboard-teacher",
        },
        {
            name: "Mahasiswa",
            url: `/${validateRole(user?.role_id)}/mahasiswa`,
            icon: "fas fa-user-graduate",
        },
    ];

    const MenuMahasiswaDashboard = [
        {
            name: "Home",
            url: "/",
            icon: "fas fa-th-large",
        },
        {
            name: "Mata Kuliah",
            url: "/matkul",
            icon: "fas fa-th-large",
        },
    ];
    const MenuDosenDashboard = [
        {
            name: "Home",
            url: `/${validateRole(user?.role_id)}`,
            icon: "fas fa-th-large",
        },
        {
            name: "Mata Kuliah Diajar",
            url: `/${validateRole(user?.role_id)}/matkul-diajar`,
            icon: "fas fa-th-large",
        },
    ];

    switch (user?.role_id) {
        case 1:
            return MenuAdminDashboard;
        case 2:
            return MenuMahasiswaDashboard;
        case 3:
            return MenuDosenDashboard;
    }
};
