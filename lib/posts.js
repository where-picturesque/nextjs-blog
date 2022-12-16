import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// process.cwd() 相当于nodejs的__dirname nextjs里不能使用__dirname
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get file names under /posts
    console.log('postsDirectory:', postsDirectory);
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)
        console.log('matterResult:', id, matterResult.data);
        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}
// 获取posts目录下的文件名
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}
// export function getPostData(id) {
//     const fullPath = path.join(postsDirectory, `${id}.md`)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)

//     // Combine the data with the id
//     return {
//         id,
//         ...matterResult.data
//     }
// }

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content)
        const contentHtml = processedContent.toString()
        return {
            id,
            contentHtml,
            ...matterResult.data
        }
    } catch (error) {
        return {
            id: ''
        }
    }


    // Combine the data with the id and contentHtml

}
