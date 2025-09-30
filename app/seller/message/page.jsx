'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("/api/contact");
      if (data.success) {
        setContacts(data.getContact || []);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

 return (
  <div className="flex-1 min-h-screen flex flex-col justify-between">
    {loading ? (
      <Loading />
    ) : (
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Messages</h2>

        {/* Scrollable container for mobile */}
        <div className="flex flex-col items-center max-w-5xl w-full overflow-x-auto rounded-md bg-white border border-gray-500/20">
          <table className="table-auto w-full min-w-[600px]">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-medium truncate">Name</th>
                <th className="px-4 py-3 font-medium truncate">Email</th>
                <th className="px-4 py-3 font-medium truncate">Phone</th>
                <th className="px-4 py-3 font-medium truncate">Message</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {contacts?.map((contact, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="px-4 py-3">{contact?.name}</td>
                  <td className="px-4 py-3">{contact?.email}</td>
                  <td className="px-4 py-3">{contact?.phone}</td>
                  <td className="px-4 py-3">{contact?.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);

};

export default ContactList;
