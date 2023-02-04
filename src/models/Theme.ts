interface Theme {
    key: string
    text: string
    background: string
}

export const themeList:Array<Theme> = [
    {
        key: 'dark',
        text: '炫酷黑',
        background: 'rgb(34, 34, 37)'
    },
    {
        key: 'red',
        text: '官方红',
        background: 'rgb(236, 65, 65)'
    },
    {
        key: 'pink',
        text: '可爱粉',
        background: 'rgb(250, 112, 167)'
    },
    {
        key: 'blue',
        text: '天际蓝',
        background: 'rgb(65, 167, 248)'
    },
    {
        key: 'green',
        text: '清新绿',
        background: 'rgb(51, 170, 126)'
    },
    {
        key: 'golden',
        text: '土豪金',
        background: 'rgb(224, 160, 79)'
    }
]
