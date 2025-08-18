import React from 'react'

const AppDetails = () => {
  return (
    <div><section id="appdetials" class="py-10 bg-gray-50">
    <div class="container mx-auto flex flex-col items-center gap-6">
      
      <div class="bg-img">
        <img src="/images/blacklogo.png" 
             alt="Logo" 
             class="h-24 w-24 object-contain" />
      </div>
  
      <div class="grid gap-4 w-full max-w-md">
        
        <div class="card bg-white shadow-md rounded-2xl p-4 text-center">
          <h6 class="text-lg font-semibold">
            TM Application: <span class="font-bold">369852114751</span>
          </h6>
        </div>
  
        <div class="card bg-white shadow-md rounded-2xl p-4 text-center">
          <h6 class="text-lg font-semibold">
            ARN Number: <span class="font-bold">369852114751</span>
          </h6>
        </div>
  
        <div class="card bg-white shadow-md rounded-2xl p-4 text-center">
          <h6 class="text-lg font-semibold">
            Provisional ID: <span class="font-bold">369852114751</span>
          </h6>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default AppDetails