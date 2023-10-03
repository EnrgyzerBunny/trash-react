import React, { useRef, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import ContentPanel from '../components/ContentPanel';

function AdminDirect() {
    const [response, setResponse]: any = useState("");
    const input: any = useRef(null);

    const name = JSON.parse(localStorage.getItem('discord-user')!).id;

    const SendStatement = (statement: string, revertCallback: any) => {
        input.current.value = "";
        setResponse("Awaiting...");

        let token = JSON.parse(localStorage.getItem('discord-token')!);
        let head = new Headers();
        head.append('Authorization', 'Bearer ' + token.access_token);
        head.append('id', name);

        const init = {
            method: 'POST',
            headers: head,
        };

        fetch("https://dotafantasy.com/api/admindirect?statement=" + statement, init)
            .then(res =>  res.json()).then ( (data) => {
                setResponse(JSON.stringify(data, null, 2));
                
            });
    };


    return (
        <PageWrapper>
            <div className="col-start-3 col-end-7 flex flex-col">
                <ContentPanel>
                    <div className="">The extremely ill-advised direct access admin panel</div>
                    <textarea value={response} rows={20} placeholder='output window' readOnly className="p-2 h-auto overflow-scroll-y caret-stone-50 focus:caret-stone-50 bg-stone-800"></textarea>
                    <div className='flex flex-auto my-4'>
                        <textarea ref={input} rows={1} placeholder="Enter mysql statement here (no semicolon)..." className="w-3/4 flex-none p-2  caret-stone-50 focus:caret-stone-50 bg-stone-800"></textarea>
                        <div onClick={() => {SendStatement(input.current.value,null);}} className='flex w-1/4 text-center'><button className='m-1 hover:bg-stone-900 bg-stone-700 text-stone-50 flex-auto'>Submit</button></div>
                    </div>

                </ContentPanel>
            </div>
        </PageWrapper>
    );
}

export default AdminDirect;