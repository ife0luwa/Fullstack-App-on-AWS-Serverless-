import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'


const XAWS = AWSXRay.captureAWS(AWS)


const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})

const bucketName = process.env.ATTACHMENT_S3_BUCKET || "serverless-c4-todo-images-koorius-1907-dev"
const urlExpiration = process.env.SIGNED_URL_EXPIRATION || 300



export function getUploadUrl(imageId: string) {
    console.log("bucketName", bucketName)
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: +urlExpiration
    })
}
// getUploadUrl("1234")
