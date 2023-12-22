import { extend } from "umi-request"

const request = extend({
    prefix: '',
    timeout: 1000000,
    requestType: 'form',
    credentials: 'include',
})

export async function requestByUpload(
    body: any,
    file?: any,
    params?: {},
    options?: { [key: string]: any }
) {
    request('/api/file/presign', {
        method: 'POST',
        params,
        data: body,
        ...(options || {}),
    }).then((res: any) => {
        console.log('presign', res)
        if (res.code === 200) {
            let form = res.data.presign_url.fields
            let formdata = new FormData()
            Object.keys(form).forEach(key => {
                formdata.append(key, form[key])
            })
            formdata.append('file', file)
            request(res.data.presign_url.url, {
                method: 'POST',
                params,
                credentials: 'omit',
                body: formdata,
                ...(options || {}),
            }).then((res: any) => {
                console.log('图片上传成功')
            }).catch((err: any) => {
                console.log('图片上传失败')
            })
        }
    }).catch((err: any) => {
        console.log(err)
    })
}