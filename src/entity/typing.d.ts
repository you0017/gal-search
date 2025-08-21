declare namespace API {
    type RegisterReq = {
        account: string;
        password: string;
        code: string;
        email: string;
        entryPassword: string;
    }
    type UpdateUserInformationReq = {
        account: string;
        userName: string;
        avatar: object;
        password: string;
        entryPassword: string;
    }
    type ResultData = {
        code: number;
        data?: any;
        msg?: string;
    }
    type LoginReq = {
        account: string;
        password: string;
        code: string;
    }
    type UserInformationVO = {
        account: string;
        userName: string;
        avatar: string;
        email: string;
    }
    type GalVO = {
        id: number;
        name: string;
        galDetailVOList: API.GalDetailVO[];
        description: string;
        url: string;
    }
    type GalDetailVO = {
        nameDetail: string;
        url: string;
        size: string;
        uploadTime: string;
    }
    type ContributeReq = {
        //标题
        title: string;
        //介绍
        summary: string;
        //链接
        webLink: string;
        //封面
        cover: object;
        //简介图片
        introPic: object[];
        //标签
        tags: string;
    }
}