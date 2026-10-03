import { createServer } from 'node:http';

type InvoiceStatus = 'pending' | 'paid';

interface Customer {
    id: number;
    name: string;
    email: string;
}

interface Invoice {
    id: number;
    amount: number;
    status: InvoiceStatus;
    issueDate: Date;
    dueDate: Date;
    customer: Customer;
}

const invoices: Invoice[] = [{
    id: 1,
    amount: 125000,
    status: 'pending',
    issueDate: new Date,
    dueDate: new Date,
    customer: {
        id: 7,
        name: 'Italo Nobre',
        email: 'contato@italonobre.com'
    }
}, {
    id: 2,
    amount: 35000,
    status: 'paid',
    issueDate: new Date,
    dueDate: new Date,
    customer: {
        id: 7,
        name: 'Italo Nobre',
        email: 'contato@italonobre.com'
    }
}];

createServer(function (request, response) {
    if (request.url === "/api/health") {
     response.writeHead(
        200,
        { 'content-type': 'application/json' }
    );
    response.end(JSON.stringify({ status: "ok" }));
    return;
    }

    if (request.url === "/api/invoices") {
        response.writeHead(
            200,
            { 'content-type': 'application/json' }
        );
        response.end(JSON.stringify(invoices));
        return;
    }

    response.writeHead(
        404,
        { 'content-type': 'application/json' }
    );
    response.end(JSON.stringify({ message: "Recurso não encontrado." }));
}).listen(3000);