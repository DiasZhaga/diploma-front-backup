// src/pages/EditAd.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate }   from "react-router-dom";
import Layout from "../components/Layout";
import ApartmentForm  from "../components/ApartmentForm";

const EditAdPage = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [initialForm, setInitial] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/v1/content/ads/${id}`, {
          credentials: "include",
          headers: { Accept: "application/json" }
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        // Преобразуем ответ в shape, который ожидает ApartmentForm
        setInitial({
          title:             data.title,
          name_appartment:   data.name_appartment,
          square:            data.square,
          num_rooms:         data.num_rooms,
          floor:             data.floor,
          year_construction: data.year_construction,
          address:           data.address,
          price:             data.price,
          ceiling_height:    data.ceiling_height,
          city:              data.city,
          district:          data.district,
          description:       data.description || "",
          bank:              Boolean(data.bank),
          pledge:            Boolean(data.pledge),
          // фото мы не ставим в initialForm, ими будет управлять input type=file
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSuccess = () => {
    navigate("/my-ads");
  };

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="mb-4">Edit Listing</h1>
        {loading && <p>Loading…</p>}
        {error   && <p className="text-danger">{error.message}</p>}
        {initialForm && (
          <ApartmentForm
            actionType="sell"         // или data.ads_type===2?"rent":"sell"
            initialForm={initialForm} // передаём заполненные поля
            editMode={true}           // флаг для PUT вместо POST
            adId={id}                 // id для endpoint’а
            onSuccess={handleSuccess} // редирект по успешному сохранению
          />
        )}
      </div>
    </Layout>
  );
};

export default EditAdPage;
