'use client';
import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {searchSlice} from "@/redux/slice/searchSlice";

const {updateSearch} = searchSlice.actions;

function OrderProject() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    return (
        <>
            <div className="border flex items-center px-2 py-2 rounded-sm">
                <label htmlFor="order" className="font-semibold">
                    Order By:
                </label>
                <select
                    name="order" id="order" onChange={(e) => {
                    const arr = ["created_at", "updated_at", "name"];
                    const value = arr[+e.target.value];
                    let query = `?_sort=${value}`;
                    if (searchParams.toString().includes("_sort") && searchParams.toString().includes("&")) {
                        let arr = searchParams.toString().split("&");
                        if (arr.length > 1) {
                            arr = arr.filter((item) => !item.includes("_sort"));
                            query = `?${arr[0]}&_sort=${value}`;
                        }
                    } else if (searchParams.toString().includes("q")) {
                        query = `?q=${searchParams.get("q")}&_sort=${value}`;
                    }
                    router.push(`${pathname + query}`);
                    dispatch(updateSearch(query.slice(1)));
                }}
                >
                    <option value="0">Created</option>
                    <option value="1">Last updated</option>
                    <option value="2">Name</option>
                </select>
            </div>
        </>
    );
}

export default OrderProject;