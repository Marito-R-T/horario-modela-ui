import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon, LoginIcon, MoodHappyIcon, TypographyIcon, UserPlusIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Principal' },
    {
        title: 'Horario',
        icon: LayoutDashboardIcon,
        to: '/'
    },
    { header: 'Manejo de Datos' },
    {
        title: 'Clases',
        icon: TypographyIcon,
        //to: '/ui/typography'
        to: '/clases'
    },
    {
        title: 'Profesores',
        icon: CopyIcon,
        //to: '/ui/shadow'
        to: '/profesores'
    },
    {
        title: 'Materias',
        icon: CopyIcon,
        //to: '/ui/shadow'
        to: '/materias'
    },
    {
        title: 'Secciones',
        icon: CopyIcon,
        //to: '/ui/shadow'
        to: '/secciones'
    },
    {
        title: 'Asignación',
        icon: CopyIcon,
        //to: '/ui/shadow'
        to: '/asignacion'
    },
    /*{ header: 'auth' },
    {
        title: 'Login',
        icon: LoginIcon,
        to: '/auth/login'
    },
    {
        title: 'Register',
        icon: UserPlusIcon,
        to: '/auth/register'
    },*/
    { header: 'Extra' },
    {
        title: 'Icons',
        icon: MoodHappyIcon,
        to: '/icons'
    },
    {
        title: 'Sample Page',
        icon: ApertureIcon,
        to: '/sample-page'
    },
];

export default sidebarItem;
