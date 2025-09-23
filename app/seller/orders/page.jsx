


'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const Orders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/seller-order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found</p>
            ) : (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                >
                  {/* Items Section */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box_icon"
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium">
                        {order?.items?.length
                          ? order.items
                              .map(
                                (item) =>
                                  `${item?.product?.name ?? "Unknown"} x ${
                                    item?.quantity ?? 0
                                  }`
                              )
                              .join(", ")
                          : "No items"}
                      </span>
                      <span>Items : {order?.items?.length ?? 0}</span>
                    </p>
                  </div>

                  {/* Address Section */}
                  <div>
                    <p>
                      <span className="font-medium">
                        {order?.address?.fullname ?? "N/A"}
                      </span>
                      <br />
                      <span>{order?.address?.area ?? "N/A"}</span>
                      <br />
                      <span>
                        {order?.address?.city ?? ""}{" "}
                        {order?.address?.state ?? ""}
                      </span>
                      <br />
                      <span>{order?.address?.phoneNumber ?? "N/A"}</span>
                    </p>
                  </div>

                  {/* Amount Section */}
                  <p className="font-medium my-auto">
                    {currency ?? "₦"}
                    {order?.amount ?? 0}
                  </p>

                  {/* Extra Info */}
                  <div>
                    <p className="flex flex-col">
                      <span>Method : COD</span>
                      <span>
                        Date :{" "}
                        {order?.date
                          ? new Date(order.date).toLocaleDateString()
                          : "N/A"}
                      </span>
                      <span>Payment : Pending</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
