
export default async function handler(req, res) {

    console.log(req.method);

    if (req.method === 'POST') {

        console.log(req.body);
        const data = req.body;
        const { title, image, address, description } = data;
    }

    res.status(200).json({
        name: 'jensy'
    })

}