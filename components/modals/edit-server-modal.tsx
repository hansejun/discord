'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FileUpload from '@/components/common/file-upload';
import serverApi from '@/api/server';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';

const EditServerModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'editServer';

  const { server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', imageUrl: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!server) return;
    try {
      const response = await serverApi.updateServer(values, server.id);
      handleModalClose();
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name);
      form.setValue('imageUrl', server.imageURl);
    }
  }, [server, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormControl>File Upload</FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required',
  }),
  imageUrl: z.string().min(1, { message: 'Server image is required' }),
});
