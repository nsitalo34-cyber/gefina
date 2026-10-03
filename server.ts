import express from 'express';

const app = express();

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

app.get('/api/health', (request, response) => {
    response.status(200).json({ status: 'ok' });
});

app.get('/api/invoices', (request, response) => {
    response.status(200).json(invoices);
});

app.get('/api/invoices/:id', (request, response) => {
   const id = +request.params.id;

    const invoice = invoices.find((invoice) => invoice.id === id);

    if (!invoice) response.status(404).json({ error: {
            status: 404,
            message: 'Fatura não encontrada.' 
        }});
    }
);

app.use((request, response) => {
    response.status(404).json({ error: {
        status: 404,
        message: 'Recurso não encontrado.' 
    }});
});

app.listen(3000);
