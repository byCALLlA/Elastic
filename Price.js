import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import Catalog from "../Catalog";
import CurrentOrder from "../CurrentOrder";
import user from '../store/user'
import Filter from "../Filter";
import Modal from "../UI/Modal";
import imageFilter from '../image/filter32.png'

const Price = observer(() => {
    const [order, setOrder] = useState([])
    const [initialCatalog, setInitialCatalog] = useState([])
    const [catalog, setCatalog] = useState([])
    const [modal, setModal] = useState(false)

    function search(e) {
        setCatalog(initialCatalog.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function addInOrder(item) {
        if (order.find(i => i.id === item.id)) {
            let itemQuantity = order.find(i => i.id === item.id).quantity
            setOrder(order.map(i => {
                if (i.id === item.id) {
                    return {id: item.id, name: item.name, quantity: itemQuantity + 1, min_price: item.min_price * (100 - user.user.discount ) / 100}
                } else return i
            }))

        } else {
            setOrder([
                ...order,
                {id: item.id, name: item.name, quantity: 1, min_price: item.min_price * (100 - user.user.discount ) / 100}
            ])
        }
    }

    useEffect(() => {
        async function initialCatalog() {
            let res = await fetch("/init")
            let catalog = await res.json()
            setInitialCatalog(catalog)
            setCatalog(catalog)
        }
        initialCatalog()
    }, [])

    return (
        <>
            <Modal
                visible={modal}
                setModal={setModal}
            >
                <Filter
                    setCatalog={setCatalog}
                    initialCatalog={initialCatalog}
                    setModal={setModal}
                />
            </Modal>
            <div onClick={() => setModal(true)}>
                <img src={imageFilter} alt="Фильтр по параметрам"/>
                <span>Фильтр по параметрам</span>
            </div>
            <Catalog
                search={search}
                catalog={catalog}
                addInOrder={addInOrder}
            />
            <CurrentOrder
                order={order}
                setOrder={setOrder}
            />
        </>
    );
})

export default Price;