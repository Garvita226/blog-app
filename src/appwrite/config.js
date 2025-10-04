import {Client, ID, TablesDB, Storage, Query} from "appwrite"
import conf from "../conf/conf";

class Service {
    client = new Client()
    tablesDB;
    storage;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.tablesDB = new TablesDB(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost( { title, slug, content, featuredImage, userId, status } ) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: { title, content, featuredImage, userId, status }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async updatePost (slug, { title, content, featuredImage, status } ) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: { title, content, featuredImage, status }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost (slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: appwriteTableId,
                rowId: slug
            })

            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPost (slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
        } catch (error) {
            console.log(error)
            false
        }
    }

    async getPosts (queries = [ Query.equal('status', 'active') ]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries
            })
        } catch (error) {
            console.log(error)
        }
    }

    // File upload service

    async uploadFile (file)  {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file 
            })
        } catch (error) {
            console.log(error)
            false
        }
    }

    async deleteFile (fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            })

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getFilePreview (fileId) {
        try {
            return this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId
            })

        } catch (error) {
            console.log(error)
            return false
        }
    }
}

const service = new Service()

export default service