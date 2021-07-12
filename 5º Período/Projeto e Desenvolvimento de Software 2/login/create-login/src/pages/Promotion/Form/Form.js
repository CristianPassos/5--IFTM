import React from 'react';
import { useParams } from 'react-router-dom';
import PromotionForm from 'components/Promotion/Form/Form';

const PagesPromotionForm = () => {
    const { id } = useParams();
    return (
        <div>
            <PromotionForm />
        </div>
    );
};

export default PagesPromotionForm;