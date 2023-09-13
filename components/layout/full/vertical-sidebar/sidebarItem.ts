import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon, MoodHappyIcon,
    UserIcon, BookIcon, NewSectionIcon, SchoolIcon, CirclesRelationIcon
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
        icon: SchoolIcon,
        //to: '/ui/typography'
        to: '/clases'
    },
    {
        title: 'Profesores',
        icon: UserIcon,
        //to: '/ui/shadow'
        to: '/profesores'
    },
    {
        title: 'Materias',
        icon: BookIcon,
        //to: '/ui/shadow'
        to: '/materias'
    },
    {
        title: 'Secciones',
        icon: NewSectionIcon,
        //to: '/ui/shadow'
        to: '/secciones'
    },
    {
        title: 'Asignación',
        icon: CirclesRelationIcon,
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
    /*{ header: 'Extra' },
    {
        title: 'Sample Page',
        icon: ApertureIcon,
        to: '/sample-page'
    },*/
    {
        title: 'Icons',
        icon: MoodHappyIcon,
        to: '/icons'
    }
];

export default sidebarItem;
