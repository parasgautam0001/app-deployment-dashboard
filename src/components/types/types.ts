interface AppNames {
    id: number,
    name: string,
    status?: string,
    version?: string,
    updatedAt?: string,
    desiredVersion?: string
};

export interface DropdownProps {
    defaultName: string;
    options: Array<AppNames>;
    setApp?: (val: number) => void;
};

export interface TopbarProps {
    application: AppNames;
    appNames: Array<AppNames>;
    setApp: (val: number) => void;
};

export interface ServiceInfoProps {
    application: {
        id: number,
        name: string,
        status: string,
        version: string,
        updatedAt: string,
        desiredVersion: string
    };
};

export interface MenuItemProps {
    icon: any;
    name: string;
    isOpen: boolean;
};

export interface SystemMetricsProps {
    applicationNames: Array<{
        id: number,
        name: string,
        status: string,
        version: string,
        updatedAt: string,
        desiredVersion: string
    }>;
};

export interface SystemChartProps {
    data: Array<{
        id: number,
        timestamp: string,
        applicationId: string,
        memoryUtilization?: string,
        cpuUtilization: string
    }>;
    applicationNames: Array<{
        id: number,
        name: string,
        status?: string,
        version?: string,
        updatedAt?: string,
        desiredVersion?: string
    }>;
    title: string;
};

export interface EventDataType {
    event: string;
    version: string;
    status: string;
    timestamp: string;
};

export interface EnvKeyValue {
    key: string;
    value: string;
};

export interface FileUploadProps {
    addEnvKeys: (val: Array<any>) => void;
    closeUpload: () => void;
    env: Array<any>;
};

export interface NavbarProps {
    selectedMenu: string;
    setSelectedMenu: (val: string) => void;
}